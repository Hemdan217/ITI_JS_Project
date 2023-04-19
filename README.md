# ITI_JS_Project

# Amazon Clone Project Description.

1. Home Page :

1)  Landing page for website
2)  Dark Mode .

2. Register Page:

1)  Take from User Email - password - confirm password.
2)  Check if the data is valid, if not error message (make sure to use valid data)
3)  Next take email check if it is registered before, if it is yes error message (This email is registered before)
4)  If data is valid and email not registered before save the data to local storage, hash the password (cipher encryption)

3. Login Page:

1)  Read the local storage.
2)  Take email ,password from user check if email is existing => check the password correct (after decryption)
3)  Save the info in cookies.

4. Products page:

1)  Call the API or JSON file.
2)  Display all products in nice.
3)  The user can search for specific product.
4)  Then user can add any product to cart
5)  Then this product will be added to session Storage.
6)  logout button, navigation

5.  Product details page:

1)  User can see details for specific product.
2)  Can add it to the cart and see the recommended items.

6. Cart page:

1)  Check if user login from cookies.
2)  Display the added products from session storage.
3)  After the user added the payment method can print receipt
