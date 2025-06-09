import { useEffect, useState } from "react";
import { version } from "pdfjs-dist";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { searchPlugin } from "@react-pdf-viewer/search";

const renderHighlights = (pageNumber) => (props) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: "9999999999",
      }}
    >
      {props.highlightAreas
        .filter(
          (area) =>
            area.pageIndex === pageNumber - 1 && area.keywordStr !== "None"
        )
        .map((area) => {
          return (
            <div
              key={`${area.top}-${area.left}`}
              style={{
                ...props.getCssProperties(area),
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "calc(var(--scale-factor)*10.00px)",
                position: "absolute",
                opacity: 0.5,
                backgroundColor: "var(--chatbot-secondary)",
              }}
            />
          );
        })}
    </div>
  );
};

const useDocument = (textToHighlight, pageNumber) => {
  const [scaler, setScaler] = useState(2);
  const [currentPageNumber, setCurrentPageNumber] = useState(pageNumber || 0);
  const [totalPages, setTotalPages] = useState(0);
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const searchPluginInstance = searchPlugin({
    enableShortcuts: false,
    renderHighlights: renderHighlights(pageNumber),
  });

  const {
    CurrentPageLabel,
    NumberOfPages,
    jumpToPage,
  } = pageNavigationPluginInstance;

  useEffect(() => {
    jumpToPage(currentPageNumber - 1);
  }, [currentPageNumber, jumpToPage]);

  const { highlight } = searchPluginInstance;

  const zoom = (n) => {
    setScaler((prev) => Math.min(Math.max(1, prev + n), 2));
  };

  const updateMatchPage = (offset, totalPages) => {
    if (offset <= totalPages && offset > 0) {
      setCurrentPageNumber(offset);
    }
  };

  const extractLines = (textContent) => {
    const items = [];
    textContent.forEach((item) => {
      items.push(item.str.toLowerCase());
      if (item.hasEOL) items.push("\n");
    });
    const textString = items.join("");
    const lines = textString.split("\n");
    return lines;
  };

  const filterLines = (lines, pattern) => {
    // sets minimum threshold to 60% of words match as a trait to successful line match on a given highlight text input
    // tweak this value in order to fluctuate the highlight frequency
    const accuracy = 0.65;
    // constraint for evaluating a matched word in a given line
    const isExcluded = (target) => target.length <= 3;
    const patterns = pattern.toLowerCase().split(/\s+/);

    return lines.filter((line) => {
      const wordArray = line.split(/\s+/).filter((word) => !isExcluded(word));
      const matches = wordArray.filter((word) =>
        patterns.some((pattern) => pattern === word)
      );
      const matchRatio = matches.length / wordArray.length;
      return matchRatio >= accuracy;
    });
  };

  const handleDocumentLoad = async (ev) => {
    const page = await ev.doc.getPage(pageNumber);
    const textContent = (await page.getTextContent()).items;
    const isHighlightedTextArray = Array.isArray(textToHighlight);
    const lines = isHighlightedTextArray ? [] : extractLines(textContent);
    const filteredLines = isHighlightedTextArray
      ? []
      : filterLines(lines, textToHighlight);

    await highlight(
      filteredLines.map((line) => ({
        keyword: line,
      }))
    ).then(() => {
      jumpToPage(pageNumber - 1);
    });

    const totalPages = ev.doc.numPages;

    setTotalPages(totalPages);
  };

  const next = (nextPageNumber) => {
    updateMatchPage(nextPageNumber, totalPages);
  };

  const prev = (prevPageNumber) => {
    updateMatchPage(prevPageNumber, totalPages);
  };

  const workerUrl = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.js`;

  return {
    plugins: [pageNavigationPluginInstance, searchPluginInstance],
    workerUrl,
    pageControl: {
      jumpToNextPage: next,
      jumpToPreviousPage: prev,
      CurrentPageLabel: CurrentPageLabel(),
      NumberOfPages: NumberOfPages(),
      currentPageNumber: currentPageNumber,
    },
    handleDocumentLoad,
    zoom,
    scaler,
  };
};

export default useDocument;
