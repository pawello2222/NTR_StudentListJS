using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using StudentListJS.Models;
using System.Data.Entity.Core.Objects;

namespace StudentListJS.Controllers
{
    public class StudentsController : ApiController
    {
        private StorageContext db = new StorageContext();

        // GET: api/Students
        public IQueryable<Student> GetStudents()
        {
            return db.Students;
        }

        // GET: api/Students/5
        [ResponseType(typeof(Student))]
        public IHttpActionResult GetStudent(int id)
        {
            Student student = db.Students.Find(id);
            if (student == null)
            {
                return NotFound();
            }

            return Ok(student);
        }

        // PUT: api/Students/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutStudent(int id, Student student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != student.IDStudent)
            {
                return BadRequest();
            }
            
            var original = db.Students.Find( student.IDStudent );

            if ( original != null )
            {
                original.FirstName = student.FirstName;
                original.LastName = student.LastName;
                original.IndexNo = student.IndexNo;
                original.BirthDate = student.BirthDate;
                original.BirthPlace = student.BirthPlace;
                original.IDGroup = student.IDGroup;
            }

            try
            {
                db.SaveChanges();
            }
            catch ( DbUpdateConcurrencyException )
            {
                if ( !StudentExists( id ) )
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch ( DbUpdateException )
            {
                return Conflict();
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Students
        [ResponseType(typeof(Student))]
        public IHttpActionResult PostStudent(Student student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Students.Add(student);

            try
            {
                db.SaveChanges();
            }
            catch ( DbUpdateException )
            {
                return Conflict();
            }

            return CreatedAtRoute("DefaultApi", new { id = student.IDStudent }, student);
        }

        // DELETE: api/Students/5
        [ResponseType(typeof(Student))]
        public IHttpActionResult DeleteStudent(int id)
        {
            Student student = db.Students.Find(id);
            if (student == null)
            {
                return NotFound();
            }

            db.Students.Remove(student);

            try
            {
                db.SaveChanges();
            }
            catch ( DbUpdateException )
            {
                return Conflict();
            }

            return Ok(student);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StudentExists(int id)
        {
            return db.Students.Count(e => e.IDStudent == id) > 0;
        }
    }
}