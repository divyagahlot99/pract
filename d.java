package com.company;

import java.util.*;

public class Main {

    public static void main(String[] args) {
        List<String[]> csv = new ArrayList();
        csv.add(new String[]{"ALPHA", "hello", "nnn"});
        csv.add(new String[]{"ALPHA", "hello", "z"});
        csv.add(new String[]{"ALPHA", "hello", "e"});
        csv.add(new String[]{"ALPHA", "hello", "w"});
        csv.add(new String[]{"ALPHA", "bye", "x"});
        csv.add(new String[]{"ALPHA", "bye", "t"});
        csv.add(new String[]{"ALPHA", "bye", "tw"});
        csv.add(new String[]{"ALPHA", "monday", "trr"});
        csv.add(new String[]{"ALPHA", "monday", "trw"});

        csv.add(new String[]{"BETA", "entry", "l"});
        csv.add(new String[]{"BETA", "exit", "aa"});
        csv.add(new String[]{"BETA", "exit", "la"});
        csv.add(new String[]{"BETA", "exit", "le"});
        csv.add(new String[]{"BETA", "exit", "lw"});
        csv.add(new String[]{"BETA", "tuesday", "laa"});
        csv.add(new String[]{"BETA", "tuesday", "ee"});
        csv.add(new String[]{"BETA", "tuesday", "ew"});
        csv.add(new String[]{"BETA", "tuesday", "ewq"});
        csv.add(new String[]{"BETA", "wednesday", "lw"});
        csv.add(new String[]{"BETA", "monday", "aa"});
        csv.add(new String[]{"BETA", "monday", "aaa"});
        csv.add(new String[]{"BETA", "monday", "aaaa"});
        csv.add(new String[]{"BETA", "monday", "aad"});
        csv.add(new String[]{"BETA", "monday", "sa"});
        csv.add(new String[]{"BETA", "monday", "ler"});

        Map<String, ArrayList<String>> ALPHA = new HashMap<>();
        Map<String, ArrayList<String>> BETA = new HashMap<>();
        Map<String, ArrayList<String>> GAMA = new HashMap<>();

        for (String[] row:csv) {
            if (row.length == 3) {
                switch(row[0]){
                    case "ALPHA":
                        if (ALPHA.containsKey(row[1])) {
                            ALPHA.get(row[1]).add(row[2]);
                            ALPHA.put(row[1], ALPHA.get(row[1]));
                        } else {
                            ALPHA.put(row[1], new ArrayList<>(Arrays.asList(row[2])));
                        }
                        break;
                    case "BETA":
                        if (BETA.containsKey(row[1])) {
                            BETA.get(row[1]).add(row[2]);
                            BETA.put(row[1], BETA.get(row[1]));
                        } else {
                            BETA.put(row[1], new ArrayList<>(Arrays.asList(row[2])));
                        }
                        break;
                    case "GAMA":
                        if (GAMA.containsKey(row[1])) {
                            GAMA.get(row[1]).add(row[2]);
                            GAMA.put(row[1], GAMA.get(row[1]));
                        } else {
                            GAMA.put(row[1], new ArrayList<>(Arrays.asList(row[2])));
                        }
                        break;
                }
            }
        }

        System.out.println(ALPHA);
        System.out.println(BETA);
        System.out.println(GAMA);
    }
}
