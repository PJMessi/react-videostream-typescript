const ValidationErrorMessage = ({
  message,
}: {
  message: string;
}): JSX.Element => {
  return (
    <>
      <small style={{ color: "red" }}>{message}</small>
    </>
  );
};

export default ValidationErrorMessage;
