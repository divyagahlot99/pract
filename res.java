import java.time.LocalDate;
import java.time.temporal.IsoFields;

public class J {
    public static void main(String[] args) {
        LocalDate dateAfter = LocalDate.parse("2015-11-30");
        System.out.println(getPreviousTenureDate(dateAfter, "quarter"));
    }

    public static LocalDate getPreviousTenureDate(LocalDate dateAfter, String tenure) {
        LocalDate qd = dateAfter;
        int month = 1;
        switch(tenure) {
            case "month":
                qd = qd.minusMonths(1);
                month = qd.getMonthValue();
                break;
            case "quarter":
                qd = qd.minusMonths(3);
                month = 3 * qd.get(IsoFields.QUARTER_OF_YEAR);
                break;
            case "annual":
                qd = qd.minusYears(1);
                month = 12;
                break;
        }
        qd = LocalDate.of(qd.getYear(), month, 1);
        qd = qd.withDayOfMonth(qd.getMonth().length(dateAfter.isLeapYear()));
        return qd;
    }
}
