import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import QrCode from "qrcode";
import QrReader from "./components/QrReader";
import ResultPlugin from "./components/ResultPlugin";

function App() {
  const [text, setText] = useState(" ");
  const [imageUrl, setImageUrl] = useState(" ");
  const [decodedResults, setDecodedResults] = useState([]);

  const generateQrcode = async () => {
    try {
      const response = await QrCode.toDataURL(text);
      setImageUrl(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const onNewScanResults = (decodedResults) => {
    console.log("App [result]", decodedResults);
    setDecodedResults((prev) => [...prev, decodedResults]);
  };
  //console.log(decodedResults);

  return (
    <Container
      sx={{
        marginTop: 10,
      }}
    >
      <Card>
        <Typography
          variant="h5"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#3f51b5",
            color: "#fff",
            padding: 20,
          }}
        >
          Generate Download & Scan QR code{" "}
        </Typography>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={12}>
              <TextField
                label="Enter Text Here"
                onChange={(e) => setText(e.target.value)}
              />
              <Button
                style={{
                  marginTop: "10px",
                  marginBottom: "20px",
                }}
                variant="contained"
                color="primary"
                onClick={() => generateQrcode()}
              >
                Generate
              </Button>
              <br />
              <br />
              <br />

              {imageUrl ? (
                <a href={imageUrl} download>
                  <img src={imageUrl} alt="" />
                </a>
              ) : null}
            </Grid>

            <Grid
              item
              xl={4}
              lg={4}
              md={6}
              sm={12}
              style={{
                backgroundColor: "#282c34",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "whitesmoke",
              }}
            >
              <QrReader
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResults}
              />

              <h3>
                Last Scanned Code:
                <span style={{ color: "red" }}>
                  {decodedResults[decodedResults.length - 1]}
                </span>
              </h3>
              {/*<p style={{ color: "yellow" }}>
                {decodedResults.map((result) => {
                  if (decodedResults.includes(result)) {
                    return <span key={result}>{result} already scanned</span>;
                  } else {
                    return <span key={result}>{result} is valid</span>;
                  }
                })}
              </p>*/}
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12}>
              <ResultPlugin results={decodedResults} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
