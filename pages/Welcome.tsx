import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

const Welcome = () => {
	return(
		<Container className="border border-primary">
			<Row>
				<Col>1 of 2</Col>
				<Col>2 of 2</Col>
			</Row>
			<Row>
				<Col>1 of 3</Col>
				<Col>2 of 3</Col>
			</Row>
		</Container>
	);
}

export default Welcome;
