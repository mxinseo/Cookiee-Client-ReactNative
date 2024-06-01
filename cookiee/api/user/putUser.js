export const putUser = async (userId, userData) => {
    try {
      const response = await fetch(`https://cookiee.site/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const responseData = await response.json();
      return responseData.result;
    } catch (error) {
      console.error("Error updating user data:", error);
      return null;
    }
  };
  
  export default putUser;
  