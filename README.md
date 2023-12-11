## Display Cabinet
Display Cabinet is a comprehensive application designed to facilitate the organization and presentation of personal collections. made for enthusiasts and collectors, this app serves as a showcase for users to upload, categorize, and exhibit their possessions.

To initiate the process, users are encouraged to upload high-quality images and information on each item in their collection. The app employs an intuitive categorization system, allowing for efficient sorting and cataloging. This organization allows the user to transform their various collections into a curated gallery, providing users with a structured and visually appealing overview of their collection.

Beyond its organizational capabilities, Display Cabinet distinguishes itself as a social platform for collectors and like-minded individuals, to view other collections through browsing other users' cabinet drawers.

In summary, Display Cabinet serves as a tool for collectors to not only archive and categorize their items but also engage with a community of fellow enthusiasts. By adhering to the structured approach outlined within the app, users can create a comprehensive and visually pleasing digital representation of their collections while participating in a broader community of collectors.

### How to use

Display cabinet is designed to be easy and intuitive to use. to organise their collection, different draws can be created, separating different catogeries witjin their collection. within these drawers, the user can then upload images with a description of their items. 
if there is updated information on such items, the user can later edit drawers at any point with the more up to date information, allowing them to keep their colllection as reliable as possible, also aiding other users in identifying teir own items woth similar characteristics.
users are also able to like items in drawers. this functionality allows the user t oidentify their most popular display pieces, as well as being able to give a form of feedback to others items.

There are 3 users already registered:

u=admin, p=admin
u=charlie, p=rex12345
u=david, p=hamish123

The system will accept these logins and list drawers and some items.

### component overview

#### asset
- The component uses the react-bootstrap library for the Spinner component.
- Conditionally renders a spinner, an image, and a message based on the props.
- The classNames are managed using the styles object from the Asset.module.css module.
- Uses the shorthand && logical operator for conditional rendering.

#### Avatar
- The component uses the styles object from the Avatar.module.css module for styling.
- Renders an img element with the specified src, height, and width.
- Displays additional text if provided.

#### MoreDropdown.js
- Utilizes react-bootstrap for the Dropdown component.
- Assumes the use of Font Awesome icons for the ellipsis, edit, and delete icons.
- Forward Ref:
Uses React.forwardRef to pass a ref to the ellipsis icon, required by Dropdown for positioning.
- ThreeDots Component:
Represents the ellipsis icon.
Passes the ref to the ellipsis icon and handles the click event.
- Dropdown Structure:
Utilizes the ThreeDots component as the toggle for the dropdown.
Dropdown items include icons for edit and delete, with corresponding click handlers (handleEdit and handleDelete).


### user stories

1. As a User I can register for using display-cabinet.

2. As a User I can login to display-cabinet and create Drawers.

3. As a User I can add Items to a drawer.

4. As a User I can open other user Drawers to view their items.

5. As an owner of a Drawer I can edit my drawer.

6. As an owner of a item I can edit my item so that I can fix or update my existing item.

7. As a User I can like other Users items.

### Issues
- There were many issues that I couldn't fix in time presenting.

1. The creating of Drawers, Items and liking items doesn't work as I kept getting 401 unauthorsied.

2. The dj-rest-auth login, user and token refresh didn't appear without specifically mapping the view.

3. If I included "/dj-rest-auth/token/refresh/" I couldn't register new users or login.