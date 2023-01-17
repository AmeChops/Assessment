# COM519 - Advanced Databases

<u>Hosted Application: </u> <p>
<u>Git Repository: </u>https://github.com/AmeChops/COM519.git<p>
</u>User Name: </u> 1800100 <p>
</u>Password: </u> greenbanana <p>

## Introduction

Within Hampshire & Isle of Wight Fire and Rescue Service there is currently no auotmated process for claiming overtime.  These are currently recorded using paper forms and spreadsheets.  This can casue delays to claims and increases possibilties for errors due to manual intervention.  This web application should provide a more robust way of claiming making it quicker and less prone to errors caused by manual intervention.

## System Overview

Employees will login with their user name, this will be their Payroll Number.  For the purpose of this application I have pre-loaded three employee records in to the database. 

The system will allow employees to create overtime claims, view previous claims, update previous claims and delete previous claims.  For the purpose of this application I have pre-loaded three types of overtime codes in to the database.

## Key Design Decisions

## Database Design

The database consists of 3 tables; Employee, Overtime and Overtime Claims.

- The Employee table hold information relating to employees.
- The Overtime table holds information relating to overtime codes.
- The Overtime Claims table holds information on the overtime that has been claimed by employees.

Please see the below entity relationship diagram which shows hows the tables link together.

![](2023-01-17-09-41-04.png)

## Security and Scalability

## Conclusion

Ideally I would have added an option for when a amnager logs in they are able to view their employees overtime claims.  This would have need an additional table, or line in employee table, to show the managers payroll number.