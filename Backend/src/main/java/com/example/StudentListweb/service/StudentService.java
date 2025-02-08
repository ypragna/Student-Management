package com.example.StudentListweb.service;
import com.example.StudentListweb.model.Student;

import java.util.List;
import java.util.Optional;

public interface StudentService {

public List<Student> getAllStudents();
public Student addStudent(Student student);
    public Optional<Student> getStudentByName(String name);
    public Student updateStudent(int id, Student updatedStudent);
    public void deleteStudent(int id);

    Optional<Student> getStudentById(int id);
}
