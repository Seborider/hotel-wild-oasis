import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles.ts";
import Button from "./ui/Button.tsx";
import Input from "./ui/Input.tsx";
import Heading from "./ui/Heading.tsx";
import Row from "./ui/Row.tsx";

const StyledApp = styled.main`
  padding: 20px;
`;

export default function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type="horizontal">
            <Heading as="h1">The Wild Oasis</Heading>
            <div>
              <Heading as="h2">Check in and out</Heading>
              <Button>Check in</Button>
              <Button variation="secondary" size="small">
                Check out
              </Button>
            </div>
          </Row>
          <Row>
            <Heading as="h3">Form</Heading>
            <form>
              <Input type="number" placeholder="Number of Guests"></Input>
              <Input type="number" placeholder="Number of Guests"></Input>
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}
