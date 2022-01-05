package com.example.trial1csv;

import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.CSVWriter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class Trial1csvApplication {

    public static void main(String[] args) {
        SpringApplication.run(Trial1csvApplication.class, args);
        readAllDataAtOnce("/Users/divyagahlot/Downloads/testcsv.csv");
    }


    public static void readAllDataAtOnce(String file)
    {
        try {
            FileReader filereader = new FileReader(file);
            CSVReader csvReader = new CSVReaderBuilder(filereader).build();
            List<String[]> allData = csvReader.readAll();
            int i;
            String s = "DIVYAAAAAAAAAAAAAAAAAAAAAAAAAA";
            List<String[]> newData = new ArrayList<>();

            String[] header = new String[allData.get(0).length];
            int j = 0;
            for (String[] row : allData) {
                if (j == 0) {
                    header = row;
                    newData.add(row);
                } else {
                    String[] newRow = new String[row.length];
                    i = 0;
                    for (String cell : row) {
                        if (cell.equalsIgnoreCase("NOT_DEFINED")) {
                            newRow[i] = cell;
                        } else if (cell.equalsIgnoreCase("")) {
                            newRow[i] = cell;
                        } else {
                            newRow[i] = s.substring(0, cell.length() - header[i].length()) + header[i];
                        }
                        i += 1;
                    }
                    newData.add(newRow);
                }
                j +=1;
            }

            File file2 = new File("/Users/divyagahlot/Downloads/outputcsv.csv");

            try {
                FileWriter outputfile = new FileWriter(file2);
                CSVWriter writer = new CSVWriter(outputfile);
                for (String[] row: newData) {
                    System.out.println(Arrays.asList(row));
                }
                writer.writeAll(newData);
                writer.close();
            }
            catch (IOException e) {
                e.printStackTrace();
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

}
