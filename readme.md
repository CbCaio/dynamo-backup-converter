# DynamoDB Backup CSV/JSON converter

## Usage

First retrieve your backup from amazon (s3?). Then follow these steps:

  1. Transforming backup into valid file and putting script output into temporary file
  
  ```
  ~ node toValidFormat.js [file_path] > temp
  ```
      
    What it does: this script simply adds trailing ',' in every line of the file (except last one), making it json-parseable

  2. Convert temporary file from previous step into CSV
      
  ```
  ~ node tempToCSV.js temp > [file_name.csv]
  ```

    What it does: this script creates the CSV file.
    
      - Separator: ,
      - Text Delimiter: "
