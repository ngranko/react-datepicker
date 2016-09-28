# react-datepicker

A small test project about porting jQuery datepicker functionality to React.

Additionally, it's coupled with an API that currently gives it info about reserved days so that you cannot select days that are already reserved.

### Configuration

To make the API work correctly, you need to point all requests to it to the `home/index.php`

For example, if you're using apache with a document root already pointed to the `api/home` folder, the added config will look something like this:

```
RewriteEngine on
RewriteRule ^(.*)$ /index.php [L]
```

### API structure

The API currently have two calls:

* `/GetReservedDays/[year]/[month]` for retrieving a list of reserved days of a given month
* `/InsertTestData` for inserting 100 random dates over 2016/2017 as reserved

### Settings

The API settings regarding the database access and the link to the frontend are located in `api/src/Settings/Settings.php`

The frontend settings regarding the API host are located in the `app/settings/settings.js`

I don't know why I'm writing all this stuff, no one will read it in any case.
