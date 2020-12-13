import { NextPage } from 'next';
import React from 'react';
import WelcomePage from './welcomePage';
import Home from './home';
import DocumentCard from '../components/DocumentCard';
import DisplayDocumentCards from 'components/DisplayDocumentCards';

const Index: NextPage = () => {
	return <DisplayDocumentCards />;
};

export default Index;
