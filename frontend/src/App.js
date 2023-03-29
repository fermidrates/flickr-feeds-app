import { useEffect, useState, useMemo, useRef } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";

import trimText from "./helpers/trimText";

const PageContainer = styled(Box)(({ theme }) => ({
  "& header": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "60px 100px",
    height: "50px",
    backgroundColor: "grey",

    "& div": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "450px",

      "&:last-child": {
        gap: "8px",
      },
    },
  },

  "& section": {
    padding: "30px 100px",
    height: "360px",

    "& > div:first-of-type": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
}));

const ImageContainer = styled(Dialog)(() => ({
  "& h2": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    "& button": {
      padding: "0px",
    },
  },
}));

const ReloadLink = styled(Typography)(() => ({
  cursor: "pointer",
  textDecoration: "underline",
}));

const CardContainer = styled(Card)(() => ({
  border: "1px solid darkgrey",
  padding: "16px 16px 24px",
  width: "600px",
  display: "grid",
  gridTemplateColumns: "50% 50%",
  gap: "16px",

  "& img": {
    width: "100%",
  },

  "& > div:first-of-type": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "& div": {
      height: "50px",
    },
  },

  "& > div:last-child": {
    padding: "0px 16px",

    "& p": {
      wordBreak: "break-all",
    },
  },
}));

const PaginationContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  padding: "20px",
}));

function App() {
  const [data, setData] = useState();
  const [selectedDataID, setSelectedDataID] = useState(1);
  const [isImageClicked, setIsImageClicked] = useState(false);

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

  const getDataByTag = async (tag) => {
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
      getDataByTag(tagRef.current.value);
    } else {
      tagRef.current.value = "";
      getData();
    }
  };

  const handlePagination = (e, value) => {
    setSelectedDataID(value);
  };

  return (
    <PageContainer>
      {isImageClicked && (
        <ImageContainer
          onClose={() => setIsImageClicked(false)}
          open={isImageClicked}
        >
          <DialogTitle>
            <Typography>Image</Typography>
            <IconButton onClick={() => setIsImageClicked(false)}>
              <Typography>X</Typography>
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <img src={selectedData?.media?.m} alt="" />
          </DialogContent>
        </ImageContainer>
      )}
      <header>
        <div>
          <Typography variant="h5">
            Load new feeds{" "}
            <ReloadLink variant="inherit" onClick={() => handleGetData(false)}>
              here
            </ReloadLink>
          </Typography>
        </div>
        <div>
          <h1>OR</h1>
        </div>
        <div>
          <Input inputRef={tagRef} placeholder="Search by tags here!" />
          <Button color="inherit" onClick={() => handleGetData(true)}>
            search
          </Button>
        </div>
      </header>
      <section>
        <div>
          <Button
            color="inherit"
            onClick={() => setSelectedDataID((current) => current - 1)}
            disabled={selectedDataID === 1}
          >
            prev
          </Button>
          <CardContainer>
            <div>
              <div>
                <Typography variant="h6">
                  {trimText(selectedData?.title || "")}
                </Typography>
              </div>
              <img
                src={selectedData?.media?.m}
                alt=""
                height="200px"
                onClick={() => setIsImageClicked(true)}
              />
            </div>
            <div>
              <Typography variant="subtitle1">{`Tags: ${
                selectedData?.tags || "-"
              }`}</Typography>
            </div>
          </CardContainer>
          <Button
            color="inherit"
            onClick={() => setSelectedDataID((current) => current + 1)}
            disabled={selectedDataID === 20}
          >
            next
          </Button>
        </div>
        <PaginationContainer>
          <Stack spacing={2}>
            <Pagination
              count={data?.length}
              page={selectedDataID}
              onChange={handlePagination}
              hidePrevButton
              hideNextButton
            />
          </Stack>
        </PaginationContainer>
      </section>
    </PageContainer>
  );
}

export default App;
