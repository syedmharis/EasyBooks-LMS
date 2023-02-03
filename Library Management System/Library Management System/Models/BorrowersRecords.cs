namespace Library_Management_System.Models
{
    public class BorrowersRecords
    {
        public int BorrowId { get; set; }
        public string? BorrowDate { get; set; }
        public string? DueDate { get; set; }
        public int Status { get; set; }
        public int StudentCopies { get; set; }
        public int BookId { get; set; }
        public int StudentId { get; set; }
        public int UserId { get; set; }

    }
}
