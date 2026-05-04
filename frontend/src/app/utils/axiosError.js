import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

//1st Process :

export const handleAxiosError = (err) => {
  //console.log(err)
  let generalError = "Something Went Wrong";
  let fieldErrors = {};

  // NETWORK ERROR (internet off / server unreachable)
  if (!err.response) {
    if (err.code === "ERR_NETWORK") {
      generalError =
        "Cannot Connect to Server,Please Check Internet Connection";
    } else if (err.code === "ECONNABORTED" || err.code === "ETIMEDOUT") {
      generalError = "Request Timeout:Network Error Occurred";
    }
  } else {
    // SERVER RETURNED RESPONSE
    const { status, data } = err.response;
    // CLIENT ERROR
    if (status >= 400 && status < 500) {
      // extract field errors if exist

      fieldErrors = Object.fromEntries(
        Object.entries(data?.errors || {}).map(([key, messages]) => [
          key,
          messages?.[0],
        ]),
      );
      // choose message based on whether field errors exist
      if (Object.keys(fieldErrors).length > 0) {
        generalError = data?.message || "Please correct the errors below.";
      } else {
        generalError = data?.message || "Request Failed.";
      }
    }
    // SERVER ERROR
    else if (status >= 500) {
      generalError =
        data?.message || "Internal Server Error. Please try again later.";
    }
  }

  return { generalError, fieldErrors };
};

// 2nd process :
/*export const handleAxiosErrors = (err) => {
  let friendlyMessage = "An unexpected error occurred. Please try again.";

  if (err.response) {
    // Server responded with status outside 2xx
    const { status, data } = err.response;

    if (status >= 500) {
      friendlyMessage =
        "Something went wrong on our server. Please try again later.";
      console.error("Server / Database error (5xx):", data);
    } else if (status === 429) {
      friendlyMessage = "Too many requests. Please wait a moment.";
    } else if (status === 401 || status === 403) {
      friendlyMessage = "Please sign in again.";
    } else if (status >= 400 && status < 500) {
      // Validation / API error (400, 422, etc.)
      friendlyMessage = data.message || "Please correct the errors below.";

      if (data.errors) {
        const newFieldErrors = {};
        Object.entries(data.errors).forEach(([key, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            newFieldErrors[key] = messages[0];
          }
        });
        //setFieldErrors(newFieldErrors);
      }
    }
  } else if (err.request) {
    // No response received → network issue
    if (err.code === "ECONNABORTED" || err.code === "ETIMEDOUT") {
      friendlyMessage = "Request timed out. Please check your connection.";
    } else {
      friendlyMessage =
        "Cannot reach the server. Check your internet connection.";
    }
    console.error("Network error:", err.message);
  } else {
    // Rare setup/configuration error
    friendlyMessage = err.message || "Unknown error";
    console.error("Axios setup error:", err);
  }

  return friendlyMessage;
};*/

export const ErrorDisplay = ({err}) => {
  return (
    <Stack
      sx={{
        width: "100%",
        alignItems: "center",
        minHeight: "200px",
        justifyContent: "center",
      }}
      spacing={2}
    >
      <Alert variant="filled" severity="error">
        {err}
      </Alert>
    </Stack>
  );
};
