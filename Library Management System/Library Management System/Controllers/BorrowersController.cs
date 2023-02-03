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
using System.Reflection;

namespace Library_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BorrowersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public BorrowersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select br.borrowId,b.bookTitle,s.studentRollNo,br.borrowDate,br.dueDate,br.status,br.studentCopies,u.userName from tbl_BorrowersRecords br inner join tbl_Students s on br.studentId = s.studentId inner join tbl_Books b on br.bookId=b.bookId inner join tbl_Users u on br.userId = u.userId;";
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
        public JsonResult Post(BorrowersRecords br)
        {
            string query = @"INSERT INTO tbl_BorrowersRecords VALUES(@bd, @dd, @s,@sc,@bi,@si,@ui)";
            DataTable dt = new DataTable();
            SqlDataReader sqlDataReader;
            using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("AttendanceAppCon")))
            {
                myCon.Open();
                using (SqlCommand sc = new SqlCommand(query, myCon))
                {
                    sc.Parameters.AddWithValue("@bd", br.BorrowDate);
                    sc.Parameters.AddWithValue("@dd", br.DueDate);
                    sc.Parameters.AddWithValue("@s", br.Status);
                    sc.Parameters.AddWithValue("@sc", br.StudentCopies);
                    sc.Parameters.AddWithValue("@bi", br.BookId);
                    sc.Parameters.AddWithValue("@si", br.StudentId);
                    sc.Parameters.AddWithValue("@ui", br.UserId);
                    sqlDataReader = sc.ExecuteReader();
                    dt.Load(sqlDataReader);
                    sqlDataReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Borrow Record Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(BorrowersRecords br)
        {
            string query = @"update tbl_BorrowersRecords set borrowDate = @bd, dueDate = @dd ,status = @s, studentCopies = @sc, bookId = @bi,studentId = @si,userId = @ui where borrowId = @borrowId";
            DataTable dt = new DataTable();
            SqlDataReader sqlDataReader;
            using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("AttendanceAppCon")))
            {
                myCon.Open();
                using (SqlCommand sc = new SqlCommand(query, myCon))
                {
                    sc.Parameters.AddWithValue("@borrowId", br.BorrowId);
                    sc.Parameters.AddWithValue("@bd", br.BorrowDate);
                    sc.Parameters.AddWithValue("@dd", br.DueDate);
                    sc.Parameters.AddWithValue("@s", br.Status);
                    sc.Parameters.AddWithValue("@sc", br.StudentCopies);
                    sc.Parameters.AddWithValue("@bi", br.BookId);
                    sc.Parameters.AddWithValue("@si", br.StudentId);
                    sc.Parameters.AddWithValue("@ui", br.UserId);
                    sqlDataReader = sc.ExecuteReader();
                    dt.Load(sqlDataReader);
                    sqlDataReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Record Updated Successfully");
        }

        [HttpDelete]
        public JsonResult Delete(BorrowersRecords br)
        {
            string query = @"delete from tbl_BorrowersRecords where borrowId = @borrowId";
            DataTable dt = new DataTable();
            SqlDataReader sqlDataReader;
            using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("AttendanceAppCon")))
            {
                myCon.Open();
                using (SqlCommand sc = new SqlCommand(query, myCon))
                {
                    sc.Parameters.AddWithValue("@borrowId", br.BorrowId);
                    sqlDataReader = sc.ExecuteReader();
                    dt.Load(sqlDataReader);
                    sqlDataReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Record Deleted Successfully");
        }
    }
}
