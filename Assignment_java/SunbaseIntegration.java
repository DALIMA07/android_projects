import org.apache.http.HttpEntity;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.IOException;



public class SunbaseIntegration {
    private static final String AUTH_ENDPOINT = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp";
    private static final String LOGIN_ID = "test@sunbasedata.com";
    private static final String PASSWORD = "Test@123";


    public static String authenticateUser() throws IOException {
        // Create the HTTP client
        CloseableHttpClient httpClient = HttpClients.createDefault();

        // Prepare the request body
        String requestBody = "{\"login_id\":\"" + LOGIN_ID + "\",\"password\":\"" + PASSWORD + "\"}";
        StringEntity requestEntity = new StringEntity(requestBody, ContentType.APPLICATION_JSON);

        // Prepare the HTTP POST request
        HttpPost httpPost = new HttpPost(AUTH_ENDPOINT);
        httpPost.setEntity(requestEntity);

        // Execute the request
        CloseableHttpResponse response = httpClient.execute(httpPost);

        try {
            // Check if the authentication was successful (HTTP status 200)
            if (response.getStatusLine().getStatusCode() == 200) {
                // Extract the bearer token from the response
                HttpEntity responseEntity = response.getEntity();
                String responseString = EntityUtils.toString(responseEntity);
                String bearerToken = responseString.split(":")[1].replaceAll("\"", "").trim();
                return bearerToken;
            } else {
                // Authentication failed
                System.err.println("Authentication failed. Status code: " + response.getStatusLine().getStatusCode());
                return null;
            }
        } finally {
            response.close();
            httpClient.close();
        }

    }

    public static void main(String[] args) throws IOException {
        // Authenticate the user and retrieve the bearer token
        String bearerToken = authenticateUser();

        if (bearerToken != null) {
            // Use the bearer token in subsequent API calls
            String apiEndpoint = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp"; // Replace with the actual API endpoint
            String apiUrl = "https://qa2.sunbasedata.com/sunbase/portal/api" + apiEndpoint;

            // Create the HTTP client
            CloseableHttpClient httpClient = HttpClients.createDefault();

            // Prepare the HTTP GET request with the bearer token in the Authorization header
            HttpGet httpGet = new HttpGet(apiUrl);
            httpGet.setHeader("Authorization", "Bearer " + bearerToken);

            // Execute the request
            CloseableHttpResponse response = httpClient.execute(httpGet);

            try {
                // Check the response status code and handle the response data as needed
                if (response.getStatusLine().getStatusCode() == 200) {
                    HttpEntity responseEntity = response.getEntity();
                    String responseData = EntityUtils.toString(responseEntity);
                    System.out.println("API response data: " + responseData);
                } else {
                    System.err.println("API call failed. Status code: " + response.getStatusLine().getStatusCode());
                }
            } finally {
                response.close();
                httpClient.close();
            }
        }
    }

}
