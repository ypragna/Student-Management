package com.example.StudentListweb.service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.StudentListweb.Repository.StudentRepository;
import com.example.StudentListweb.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl implements StudentService {
	@Autowired
	StudentRepository studentRepository;
	@Override
	public List<Student> getAllStudents() {
	List<Student> students=studentRepository.findAll();
		return students;
	}
	@Override
	public Student addStudent(Student student) {
		return studentRepository.save(student);
	}
	@Override
	public Optional<Student> getStudentByName(String name) {
		return studentRepository.findByName(name);
	}
	@Override
	public Student updateStudent(int id, Student updatedStudent) {
		return studentRepository.findById(id).map(student -> {
			student.setName(updatedStudent.getName());
			student.setAge(updatedStudent.getAge());
			student.setStudentClass(updatedStudent.getStudentClass());
			student.setPhonenumber(updatedStudent.getPhonenumber());
			return studentRepository.save(student);
		}).orElseThrow(() -> new RuntimeException("Student not found"));
	}
	@Override
	public void deleteStudent(int id) {
		studentRepository.deleteById(id);
	}

	@Override
	public Optional<Student> getStudentById(int id) {
		return studentRepository.findById(id);
	}

}
