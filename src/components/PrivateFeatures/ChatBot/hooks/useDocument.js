import { useRef, useState } from "react";
import { version } from "pdfjs-dist";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { searchPlugin } from "@react-pdf-viewer/search";

const renderHighlights = (props) => {
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
      {props.highlightAreas.map((area) => {
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
              backgroundColor: "var(--chatbot-secondary)",
            }}
          >
            {area.keywordStr}
          </div>
        );
      })}
    </div>
  );
};

const useDocument = (highlights = []) => {
  const [uniquePageMatcheIndices, setUniquePageMatchIndices] = useState([]);
  const currentMatchPageRef = useRef(0);
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const searchPluginInstance = searchPlugin({
    renderHighlights,
  });

  const updateMatchPage = (offset) => {
    const currentPageIndex = currentMatchPageRef.current;
    const newPageIndex = currentPageIndex + offset;
    if (newPageIndex < 0)
      currentMatchPageRef.current = uniquePageMatcheIndices.length - 1;
    else
      currentMatchPageRef.current =
        newPageIndex % uniquePageMatcheIndices.length;
    const page = uniquePageMatcheIndices[currentMatchPageRef.current];
    jumpToMatch(page);
  };

  const { highlight, jumpToMatch } = searchPluginInstance;

  const { CurrentPageLabel, NumberOfPages } = pageNavigationPluginInstance;

  const handleDocumentLoad = () => {
    setTimeout(async () => {
      const groups = await Promise.all(
        highlights.flatMap((keyword) =>
          highlight({ keyword, matchCase: false, wholeWords: false })
        )
      );
      setUniquePageMatchIndices([
        ...new Set(
          groups.flatMap((matches) => matches.map((match) => match.pageIndex))
        ),
      ]);
    }, 0);
  };

  const next = () => {
    updateMatchPage(1);
  };

  const prev = () => {
    updateMatchPage(-1);
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
    },
    handleDocumentLoad,
  };
};

export default useDocument;
