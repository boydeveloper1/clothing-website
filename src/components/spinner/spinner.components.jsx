import { SpinnerContainer, SpinnerOverlay } from "./spinner.styles";

const Spinner = () => {
  return (
    <SpinnerOverlay data-testid="spinner">
      <SpinnerContainer />
    </SpinnerOverlay>
  );
};

export default Spinner;
