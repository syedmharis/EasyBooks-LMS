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
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT  *   FROM    tbl_Users";
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
        public JsonResult Post(Users users)
        {
            string query = @"INSERT INTO tbl_Users VALUES(@un, @uc, @up)";
            DataTable dt = new DataTable();
            SqlDataReader sqlDataReader;
            using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("AttendanceAppCon")))
            {
                myCon.Open();
                using (SqlCommand sc = new SqlCommand(query, myCon))
                {
                    sc.Parameters.AddWithValue("@un", users.UserName);
                    sc.Parameters.AddWithValue("@uc", users.UserContact);
                    sc.Parameters.AddWithValue("@up", users.UserPassword);
                    sqlDataReader = sc.ExecuteReader();
                    dt.Load(sqlDataReader);
                    sqlDataReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("User Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Users users)
        {
            string query = @"update tbl_Users set userName = @un, userContact = @uc ,userPassword = @up where userId = @userId";
            DataTable dt = new DataTable();
            SqlDataReader sqlDataReader;
            using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("AttendanceAppCon")))
            {
                myCon.Open();
                using (SqlCommand sc = new SqlCommand(query, myCon))
                {
                    sc.Parameters.AddWithValue("@userId", users.UserId);
                    sc.Parameters.AddWithValue("@un", users.UserName);
                    sc.Parameters.AddWithValue("@uc", users.UserContact);
                    sc.Parameters.AddWithValue("@up", users.UserPassword);
                    sqlDataReader = sc.ExecuteReader();
                    dt.Load(sqlDataReader);
                    sqlDataReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("User Updated Successfully");
        }

        [HttpDelete]
        public JsonResult Delete(Users users)
        {
            string query = @"delete from tbl_Users where userId = @userId";
            DataTable dt = new DataTable();
            SqlDataReader sqlDataReader;
            using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("AttendanceAppCon")))
            {
                myCon.Open();
                using (SqlCommand sc = new SqlCommand(query, myCon))
                {
                    sc.Parameters.AddWithValue("@userId", users.UserId);
                    sqlDataReader = sc.ExecuteReader();
                    dt.Load(sqlDataReader);
                    sqlDataReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("User Deleted Successfully");
        }
    }
}
