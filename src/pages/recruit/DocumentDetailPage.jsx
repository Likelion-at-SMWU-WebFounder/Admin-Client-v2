import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import apiModule from "../../api/apiModule";
import Form from "../../components/document/Form";
import Question from "../../components/document/Question";

const DocumentDetailPage = () => {
  const { joinerId } = useParams();
  const [documentData, setDocumentData] = useState(null);

  useEffect(() => {
    const fetchDocumentData = async () => {
      try {
        const data = await apiModule.fetchDocumentDetail(joinerId);
        setDocumentData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDocumentData();
  }, [joinerId]);

  return (
    <Layout>
      <Container>
        <Form documentData={documentData} />
        <Question documentData={documentData} />
      </Container>
    </Layout>
  );
};

export default DocumentDetailPage;

const Layout = styled.div`
  display: flex;
  background-color: #111111;
`;

const Container = styled.div`
  flex-direction: column;
  align-items: center;
  padding: 70px;
  margin-left: 70px;
`;
