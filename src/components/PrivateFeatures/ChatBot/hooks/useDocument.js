import { useRef, useState } from "react";
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
  const [uniquePageMatcheIndices, setUniquePageMatchIndices] = useState([]);
  const currentMatchPageRef = useRef(0);
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const searchPluginInstance = searchPlugin({
    enableShortcuts: false,
    renderHighlights: renderHighlights(pageNumber),
  });

  const highlights = Array.isArray(textToHighlight)
    ? textToHighlight
    : [textToHighlight];

  const { highlight } = searchPluginInstance;

  const updateMatchPage = (offset) => {
    const currentPageIndex = currentMatchPageRef.current;
    const newPageIndex = currentPageIndex + offset;
    if (newPageIndex < 0)
      currentMatchPageRef.current = uniquePageMatcheIndices.length - 1;
    else
      currentMatchPageRef.current =
        newPageIndex % uniquePageMatcheIndices.length;
    const page = uniquePageMatcheIndices[currentMatchPageRef.current];
    jumpToPage(page);
  };

  const { CurrentPageLabel, NumberOfPages, jumpToPage } =
    pageNavigationPluginInstance;

  const handleDocumentLoad = () => {
    setTimeout(async () => {
      highlight(
        highlights.map((keyword) => ({
          keyword,
          multiline: true,
          wholeWords: false,
          matchCase: false,
          exec: (word) => word !== "None",
        }))
      ).then(() => {
        jumpToPage(pageNumber - 1);
      });

      setUniquePageMatchIndices([pageNumber - 1]);
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
