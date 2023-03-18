import { useEffect, useState, useMemo, useRef } from "react";

import trimText from "./helpers/trimText";

function App() {
  const [data, setData] = useState();
  const [selectedDataID, setSelectedDataID] = useState(1);

  const tagRef = useRef();

  const getData = async () => {
    const res = await fetch("http://localhost:8080/feeds");
    const formatRes = await res.json();

    const formatResItems = formatRes.items.map((item, index) => {
      return {
        ...item,
        ID: index + 1,
      };
    });
    setData(formatResItems);
    setSelectedDataID(1);
  };

  const getDataByTags = async (tag) => {
    const res = await fetch(`http://localhost:8080/feeds/${tag}`);
    const formatRes = await res.json();

    const formatResItems = formatRes.items.map((item, index) => {
      return {
        ...item,
        ID: index + 1,
      };
    });
    setData(formatResItems);
    setSelectedDataID(1);
  };

  const selectedData = useMemo(() => {
    return data?.find((datum) => datum.ID === selectedDataID);
  }, [data, selectedDataID]);

  useEffect(() => {
    getData();
  }, []);

  const handleGetData = (byTag) => {
    if (byTag) {
      getDataByTags(tagRef.current.value);
    } else {
      getData();
    }
  };

  return (
    <>
      <header>
        <div>
          <h5>
            Load new feeds{" "}
            <span onClick={() => handleGetData(false)}>here</span>
          </h5>
        </div>
        <div>
          <h1>OR</h1>
        </div>
        <div>
          <input ref={tagRef} placeholder="Search by tags here!" />
          <button onClick={() => handleGetData(true)}>search</button>
        </div>
      </header>
      <section>
        <div>
          <button
            onClick={() => setSelectedDataID((current) => current - 1)}
            disabled={selectedDataID === 1}
          >
            prev
          </button>
          <div>
            <div>
              <div>
                <h6>{trimText(selectedData?.title || "")}</h6>
              </div>
              <img src={selectedData?.media?.m} alt="" height="200px" />
            </div>
            <div>
              <p>{`Tags: ${selectedData?.tags || "-"}`}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedDataID((current) => current + 1)}
            disabled={selectedDataID === 20}
          >
            next
          </button>
        </div>
      </section>
    </>
  );
}

export default App;
