import React, { use, useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import MermaidViewer from "../components/MermaidViewer";
import axios from "axios";

const Flowchart = () => {
  const [diagram, setDiagram] = useState(null);

  if (!diagram) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  // useEffect(() => {
  //   axios.get("").then((response) => {
  //     setDiagram(response.data.mermaidCode);
  //   });
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      <MermaidViewer mermaidCode={diagram} />
    </View>
  );
};

export default Flowchart;
