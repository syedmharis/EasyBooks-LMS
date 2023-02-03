using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using Library_Management_System.Models;
using Microsoft.Extensions.Configuration;

namespace Library_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public BooksController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT  *   FROM    tbl_Books";
            DataTable dt = new DataTable();
            SqlDataReader sqlDataReader;
            using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("AttendanceAppCon")))
            {
                myCon.Open();
                using (SqlCommand sc = new SqlCommand(query, myCon))
                {
                    sqlDataReader = sc.ExecuteReader();
                    dt.Load(sqlDataReader);
                    sqlDataReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(dt);
        }

        [HttpPost]
        public JsonResult Post(Books books)
        {
            string query = @"INSERT INTO tbl_Books VALUES(@bookTitle, @bookEdition, @bookAuthor,@publisherName)";
            DataTable dt = new DataTable();
            SqlDataReader sqlDataReader;
            using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("AttendanceAppCon")))
            {
                myCon.Open();
                using (SqlCommand sc = new SqlCommand(query, myCon))
                {
                    sc.Parameters.AddWithValue("@bookTitle", books.BookTitle);
                    sc.Parameters.AddWithValue("@bookEdition", books.BookEdition);
                    sc.Parameters.AddWithValue("@bookAuthor", books.BookAuthor);
                    sc.Parameters.AddWithValue("@publisherName", books.PublisherName);
                    sqlDataReader = sc.ExecuteReader();
                    dt.Load(sqlDataReader);
                    sqlDataReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Book Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Books books)
        {
            string query = @"update tbl_Books set bookTitle = @bt,  bookEdition = @be, bookAuthor =  @ba, publisherName = @pn where bookId = @bookId";
            DataTable dt = new DataTable();
            SqlDataReader sqlDataReader;
            using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("AttendanceAppCon")))
            {
                myCon.Open();
                using (SqlCommand sc = new SqlCommand(query, myCon))
                {
                    sc.Parameters.AddWithValue("@bookId", books.BookId);
                    sc.Parameters.AddWithValue("@bt", books.BookTitle);
                    sc.Parameters.AddWithValue("@be", books.BookEdition);
                    sc.Parameters.AddWithValue("@ba", books.BookAuthor);
                    sc.Parameters.AddWithValue("@pn", books.PublisherName);
                    sqlDataReader = sc.ExecuteReader();
                    dt.Load(sqlDataReader);
                    sqlDataReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Book Updated Successfully");
        }

        [HttpDelete]
        public JsonResult Delete(Books books)
        {
            string query = @"delete from tbl_Books where bookId = @bookId";
            DataTable dt = new DataTable();
            SqlDataReader sqlDataReader;
            using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("AttendanceAppCon")))
            {
                myCon.Open();
                using (SqlCommand sc = new SqlCommand(query, myCon))
                {
                    sc.Parameters.AddWithValue("@bookId", books.BookId);
                    sqlDataReader = sc.ExecuteReader();
                    dt.Load(sqlDataReader);
                    sqlDataReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Book Deleted Successfully");
        }
    }
}
