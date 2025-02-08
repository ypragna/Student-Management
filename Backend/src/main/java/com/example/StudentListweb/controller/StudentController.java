package com.example.StudentListweb.controller;

import java.util.List;
import java.util.Optional;

import com.example.StudentListweb.model.Student;
import com.example.StudentListweb.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;


import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/student")
public class StudentController {
	@Autowired
	StudentService studentService;

	@PostMapping("/add")
	public ResponseEntity<Student> addStudent(@RequestBody Student student) {
		return ResponseEntity.ok(studentService.addStudent(student));
	}

	@GetMapping("/getallstudents")
	public List<Student> getStudentList(){
			return studentService.getAllStudents();
	}

	@GetMapping("/search")
	public ResponseEntity<Student> getStudentByName(@RequestParam String name) {
		Optional<Student> student = studentService.getStudentByName(name);
		return student.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
	@GetMapping("/{id}")
	public ResponseEntity<Student> getStudentByName(@RequestParam int id) {
		Optional<Student> student = studentService.getStudentById(id);
		return student.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Student> updateStudent(@PathVariable int id, @RequestBody Student student) {
		return ResponseEntity.ok(studentService.updateStudent(id, student));
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteStudent(@PathVariable int id) {
		studentService.deleteStudent(id);
		return ResponseEntity.ok("Student deleted successfully");
	}
}
