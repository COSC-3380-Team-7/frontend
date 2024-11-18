<div>
  <picture align="center">
    <source
      width="100%"
      media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
      srcset="/documentation/documentationHeader.png"
    />
    <source
      width="100%"
      media="(prefers-color-scheme: dark)"
      srcset="/documentation/documentationHeader.png"
    />
    <img alt="Logo">
  </picture>
  <h1 align="center">
    The Baker Museum
  </h1>
  <p>
    Welcome to the Houston Zoo database system and our full-stack website project! Our goal was to design and implement a practical database system tailored for a zoo setting, enabling efficient management of animals, exhibits, habitats, ticketing, and visitor interactions.
  </p>
</div>

-----

### About the Houston Zoo Project

Welcome to the Houston Zoo database and our full-stack website project! We aimed to design and implement a practical database system tailored for a zoo environment.

#### Mini-World Description:
Our mini-world revolves around two main sections:
- **Users**: Customers, employees, and branch directors interact with the museum's services and activities. We manage and store information associated with each user, implementing features like memberships and employee roles.
- **Artistic Entities and Operations**: The museum's collections, art pieces, exhibits, tickets, and gift shop inventory are managed through the system. Customers can purchase tickets and items, employees curate exhibits, the restaurant, or the giftshop, and branch directors oversee their branch and implement additions, updates, and deletions to be made.

#### Key Relationships:
- **Directors**: Manage employees, organize exhibits, and oversee museum operations.
- **Exhibits**: Contain art pieces curated under specific themes.
- **Customers**: Make donations, purchase tickets, and report complaints.
- **Employees**: Manage gift shop items and ticket sales.

This database system enables efficient tracking of museum activities, financial transactions, and user interactions, empowering the Museum of Fine Arts to generate insightful reports for assessing its success and improving visitor experiences.

# Project Requirements
<h6>Each bullet will route to the specific instance in which we have implemented them</h6>

1. [**User Authentication for different user roles**](#user-auth)
2. [**Data entry forms to add new data, modify existing data, and 'delete' data**](#data-entry-forms)
3. [**At least 2 triggers**](#triggers)
4. [**At least 3 queries**](#queries)
5. [**At least 3 reports**](#reports)

# Technologies

**Frontend**:
![React](https://img.shields.io/badge/-React-blue?logo=react&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)

**Backend**: 
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)

**Database**: 
![MySQL](https://img.shields.io/badge/-MySQL-4479A1?logo=mysql&logoColor=white)

**Testing**: 
![Postman](https://img.shields.io/badge/-Postman-FF6C37?logo=postman&logoColor=white)

**Authentication**: 
![JWT](https://img.shields.io/badge/-JWT-000000?logo=json-web-tokens) ![JS-Cookies](https://img.shields.io/badge/-JS_Cookies-F7DF1E?logo=javascript&logoColor=black)

**Deployment**: 
![Vercel](https://img.shields.io/badge/-Vercel-000000?logo=vercel&logoColor=white) ![Render](https://img.shields.io/badge/-Render-2D2D2D?logo=render&logoColor=white) ![Azure](https://img.shields.io/badge/-Azure-0089D6?logo=microsoft-azure&logoColor=white)

**Version Control**:
![Git](https://img.shields.io/badge/-Git-F05032?logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white)

# Hosting Locally

- Install git on your machine if you haven't already.
- Make sure the latest version of [Node.js](https://nodejs.org/en/) is installed on your machine. Some features may not work on older versions of Node.js.

### Cloning The Repository

```bash
git clone https://github.com/Ashishjob/museuma.git
cd museuma
code .
```

> [!IMPORTANT]
> Ensure both `Source/client/example.env` and `Source/client/server.env` are renamed to `.env` and are properly configured before hosting locally.

### Starting The Client

```bash
cd museuma       # If not already in the client directory.
npm i -y         # Install dependencies.
npm start        # Start the client.
```

> [!NOTE]
> A new window will automatically open in your default browser on `http://localhost:3000`.

### Starting The Server

```bash
cd Backend       # If not already in the server directory.
npm i            # Install dependencies.
npm start        # Start the server.
```

> [!NOTE]
> A new window will become visible on your default browser on `http://localhost:8081`; however, it will not automatically open, so make sure to open this link manually.

<a name="user-auth"></a>
## User Authentication for different user roles
We have 3 different user roles implemented for this: Admin, Employee, and User.
- Admin: The Admin has access to see and manage everything as they should.
  - username: baker
  - password: password123
- Employee: The Employee is able to manage whatever branch it is they work under (i.e. if they work in the Gift Shop branch, they can access the manage-giftshop page.
  - username: scammer
  - password: password123
- User: The User is any member of the public that can only view what the museum has to offer, purchase tickets/giftshop items, and leave complaints from their visit.
  - username: jtest
  - password: password

<a name="data-entry-forms"></a>
## Data entry forms to add new data, modify existing data, and 'delete' data
We have plenty of pages through which the admin or employee of that branch can access and add/edit/delete to/from.
### Admin/Employee/User:
- [Sign Up](https://www.bakermuseum.art/signup): This page is a data entry form where you can add your information to get into the system to be able to log in.
- [Edit Profile](https://www.bakermuseum.art/profile): This page is an editable data form where you can edit the data you entered from the Sign Up page.
- [Complaints](https://www.bakermuseum.art/complaints): This entry form is for users to enter complaints concerning their experience at the museum.

### Admin/Employee:
- [Manage Artworks](https://www.bakermuseum.art/admin/manage-artworks): This data entry form is for admins or employees who work in any department concerning artwork, to come in and add, delete, or edit artworks on premises at the museum.
- [Manage Gift Shop](https://www.bakermuseum.art/admin/manage-giftshop): This data entry form is for admins or employees who work in the giftshop department to be able to add, delete, or edit items that can be purchased by customers in the giftshop.
- [Manage Restaurant](https://www.bakermuseum.art/admin/manage-restaurant): This data entry form is for admins or employees who work in the restaurant department to be able to add, delete, or edit dishes available at the restaurant.

### Admin-Only:
- [Manage Employees](https://www.bakermuseum.art/admin/manage-employees): This data entry form is for admins to be able to add, delete (fire/terminate), and edit employees; however, firing only makes the employee "inactive" and there is a button at the top where the admin can view all inactive employees, and rehire them if desired.
- [Manage Exhibits](https://www.bakermuseum.art/admin/manage-exhibits): This data entry form is for admins to be able to add, delete (make inactive), and edit the exhibits at the museum. Similar to the rehiring for the employees, admins can also reactivate exhibits if they are to become open again.

<a name="triggers"></a>
## Triggers

### Sick Animal Trigger:
This setup automates the notification process for zookeepers when an animal's health deteriorates. It ensures health status consistency across the database, and allows timely alerts to zookeepers, allowing quick responses.

```sql
CREATE PROCEDURE insert_sick_animal_notification(
    IN p_animal_id BIGINT,
    IN p_health_status VARCHAR(20)
)
BEGIN
    -- Update the animal's health status
    UPDATE animals
    SET health_status = p_health_status
    WHERE animal_id = p_animal_id;

    -- Insert into the email queue
    INSERT INTO sick_animal_notification_email_queue (email, first_name, last_name, animal_id, animal_name, animal_nickname, health_status, message)
    SELECT 
        e.email, 
        e.first_name,
        e.last_name,
        p_animal_id,
        a.name,
        a.nickname,
        p_health_status,
        CONCAT('The animal ', a.nickname, ' the ', a.name, ' is ', LOWER(p_health_status), '. Please check on it.')
    FROM
        employees e
            JOIN
        occupation o ON e.occupation_id = o.occupation_id
            JOIN
        departments AS d ON e.department_id = d.department_id,
        animals a
    WHERE
        o.name = 'Zookeeper'
        AND a.animal_id = p_animal_id;
END $$

DELIMITER ;

DROP TRIGGER IF EXISTS after_veterinary_report_insert;

DELIMITER $$

CREATE TRIGGER after_veterinary_report_insert
AFTER INSERT ON veterinaryreports
FOR EACH ROW
BEGIN
    IF NEW.health_status = 'Sick' OR NEW.health_status = 'Injured' THEN
        CALL insert_sick_animal_notification(NEW.animal_id, NEW.health_status);
    END IF;
END $$

DELIMITER ;

### Restock Animal Food Trigger:
This trigger ensures that when food for animals runs out, managers that are responsible for restocking are immediately notified. It helps prevent delays in replenishment and supports the animals by ensuring timely restocking of supplies.

```sql
DELIMITER $$

CREATE PROCEDURE insert_animal_food_restock_notification(
    IN p_animal_food_id BIGINT,
    IN p_food_name VARCHAR(100)
)
BEGIN
    -- Insert into the email queue
    INSERT INTO animal_food_restock_email_queue (email, first_name, last_name, animal_food_id, message)
    SELECT 
        e.email, 
        e.first_name,
        e.last_name,
        p_animal_food_id, 
        CONCAT(p_food_name, ' is out of stock. Please restock.')
    FROM
        employees e
            JOIN
        occupation o ON e.occupation_id = o.occupation_id
            JOIN
        departments AS d ON e.department_id = d.department_id
            JOIN
        authlevel AS a ON e.auth_level_id = a.auth_level_id
    WHERE
        o.name = 'Zookeeper' AND a.title = 'Manager';
END $$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER restock_animal_food
AFTER UPDATE ON animalfood
FOR EACH ROW
BEGIN
    IF NEW.stock = 0 AND OLD.stock > 0 THEN
        CALL insert_animal_food_restock_notification(NEW.animal_food_id, NEW.food_name);
    END IF;
END $$

DELIMITER ;
```

<a name="queries"></a>
## Queries
We have 3 queries that go with the 3 reports we go more into detail later: one for a Health Analysis Report, an  Cost Analysis of Animal Food Data Report,

### Health Analysis Report Query:

- This query combines data about animals in a zoo, calculating stats like total food consumed, types of food eaten, weight and height changes of the animal, and health statuses based on veterinary reports. It joins data from multiple tables (animalfoodeaten, animals, animalfood, veterinaryreports), groups by animal identifiers, and organizes the results by the animal's name.

```sql
SELECT 
            a.animal_id,
            a.name AS animal_name,
            a.nickname,
            SUM(af.quantity) AS total_food_quantity,
            GROUP_CONCAT(DISTINCT f.food_name SEPARATOR ', ') AS food_types,
            MIN(vr.measured_weight) AS min_weight,
            MAX(vr.measured_weight) AS max_weight,
            (MAX(vr.measured_weight) - MIN(vr.measured_weight)) AS net_weight_change,
            MIN(vr.measured_height) AS min_height,
            MAX(vr.measured_height) AS max_height,
            (MAX(vr.measured_height) - MIN(vr.measured_height)) AS net_height_change,
            SUM(CASE WHEN vr.health_status = 'Sick' THEN 1 ELSE 0 END) AS sick_count,
            SUM(CASE WHEN vr.health_status = 'Injured' THEN 1 ELSE 0 END) AS injured_count,
            COUNT(vr.vet_report_id) AS total_checkups
        FROM 
            animalfoodeaten af
        JOIN 
            animals a ON af.animal_id = a.animal_id
        JOIN 
            animalfood f ON af.animal_food_id = f.animal_food_id
        JOIN 
            veterinaryreports vr ON a.animal_id = vr.animal_id
        GROUP BY 
            a.animal_id, a.name, a.nickname
        ORDER BY 
            a.name
```

###  Cost Analysis of Animal Food Data Report Query:

- This query calculates the stats on food consumption and cost per animal, including the total food eaten, the food type, and the food cost relative to purchase price. It combines data by joining multiple tables (animals, animalfoodeaten, animalfood, animalfoodpurchases), filtering for valid food quantities, grouping by animal name and food details, and ordering the results by animal name and food name.

```sql
SELECT
            a.name,
            SUM(afe.quantity) AS food_eaten,
            af.food_name,
            af.food_type,
            ROUND((SUM(afe.quantity) / SUM(afp.quantity)) * SUM(afp.quantity * afp.purchased_price), 2) AS food_eaten_cost,
            SUM(afp.quantity * afp.purchased_price) AS cumulative_purchase_cost
        FROM
            animals AS a
            JOIN animalfoodeaten AS afe ON a.animal_id = afe.animal_id
            JOIN animalfood AS af ON afe.animal_food_id = af.animal_food_id
            JOIN animalfoodpurchases AS afp ON af.animal_food_id = afp.animal_food_id
        WHERE afe.quantity IS NOT NULL AND afe.quantity > 0
        GROUP BY a.name, af.food_name, af.food_type
        ORDER BY a.name, af.food_name
```

### Complaints Report Query:

- This query was built to get a report from the `complaints` and `customers` tables so that the admin would be able to see all the complaints logged by visitors/users regarding each specific exhibit.

```sql
SELECT 
complaints.complaint_id,
customers.first_name,
customers.last_name,
complaints.branch,
complaints.description,
complaints.date_and_time
    FROM 
    complaints
INNER JOIN 
customers ON complaints.customer_id = customers.customer_id;
```

<a name="reports"></a>
## Reports
We have 3 data reports: Sales, Exhibits, and Complaints.

### Sales:
In this report, it combines data about animals in a zoo, calculating the statistics akin to total food consumed, types of food eaten, weight and height changes of the animal, and health statuses based on veterinary reports. It joins data from multiple tables such as animalfoodeaten, animals, animalfood, veterinaryreports.This allows it to be grouped by animal identifiers, and organizes the results by the animal's name.


![image](https://github.com/Ashishjob/museuma/assets/114624617/abbd8d2c-39d6-4838-9bf4-b004eda308bf)

### Exhibit:
In this report, it calculates the statistics on food consumption and cost per animal, including the total food eaten, the food type, and the food cost relative to purchase price. It combines data by joining multiple tables (animals, animalfoodeaten, animalfood, animalfoodpurchases), filtering for valid food quantities, grouping by animal name and food details, and ordering the results by animal name and food name.


![image](https://github.com/Ashishjob/museuma/assets/114624617/e4dd57bf-2240-497e-8805-56d3f0a4823b)

### Complaints:
In this report, we have the Branch/Exhibit that the complaint is directed to, the Date and Time it was logged, the Complaint Message, and the User that logged the complaint as our identifiers to give a clear report on all the complaints that have been logged at our museum, so that they can be taken care of. We also have a search feature where the user can search by branch to find specific complaints concerning a branch/exhibit as well as a time filter, to look for certain times such as All Time, Last Week, Last Month, Last Year, or Between Dates where the user can select a start and stop time.

![image](https://github.com/Ashishjob/museuma/assets/114624617/020f463c-2a40-4eb2-9b4f-1f7849120243)
