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
    public class StudentsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public StudentsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT  *   FROM    tbl_Students";
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
        public JsonResult Post(Students students)
        {
            string query = @"INSERT INTO tbl_Students VALUES(@studentRollNo, @studentName, @studentCourse,@studentContact,@studentGender)";
            DataTable dt = new DataTable();
            SqlDataReader sqlDataReader;
            using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("AttendanceAppCon")))
            {
                myCon.Open();
                using (SqlCommand sc = new SqlCommand(query, myCon))
                {
                    sc.Parameters.AddWithValue("@studentRollNo", students.StudentRollNo);
                    sc.Parameters.AddWithValue("@studentName", students.StudentName);
                    sc.Parameters.AddWithValue("@studentCourse", students.StudentCourse);
                    sc.Parameters.AddWithValue("@studentContact", students.StudentContact);
                    sc.Parameters.AddWithValue("@studentGender", students.StudentGender);
                    sqlDataReader = sc.ExecuteReader();
                    dt.Load(sqlDataReader);
                    sqlDataReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Student Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Students students)
        {
            string query = @"update tbl_Students set studentRollNo = @studentRollNo,  studentName = @studentName, studentCourse =  @studentCourse, studentContact = @studentContact , studentGender = @studentGender where studentId = @StudentId";
            DataTable dt = new DataTable();
            SqlDataReader sqlDataReader;
            using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("AttendanceAppCon")))
            {
                myCon.Open();
                using (SqlCommand sc = new SqlCommand(query, myCon))
                {
                    sc.Parameters.AddWithValue("@StudentId", students.StudentId);
                    sc.Parameters.AddWithValue("@studentRollNo", students.StudentRollNo);
                    sc.Parameters.AddWithValue("@studentName", students.StudentName);
                    sc.Parameters.AddWithValue("@studentCourse", students.StudentCourse);
                    sc.Parameters.AddWithValue("@studentContact", students.StudentContact);
                    sc.Parameters.AddWithValue("@studentGender", students.StudentGender);
                    sqlDataReader = sc.ExecuteReader();
                    dt.Load(sqlDataReader);
                    sqlDataReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Student Record Updated Successfully");
        }

        [HttpDelete]
        public JsonResult Delete(Students students)
        {
            string query = @"delete from tbl_Students where studentId = @studentId";
            DataTable dt = new DataTable();
            SqlDataReader sqlDataReader;
            using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("AttendanceAppCon")))
            {
                myCon.Open();
                using (SqlCommand sc = new SqlCommand(query, myCon))
                {
                    sc.Parameters.AddWithValue("@studentId", students.StudentId);
                    sqlDataReader = sc.ExecuteReader();
                    dt.Load(sqlDataReader);
                    sqlDataReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Student Deleted Successfully");
        }
    }
}
