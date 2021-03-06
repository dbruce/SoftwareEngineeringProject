package com.commercebank.dao;

import com.commercebank.model.Manager;
import com.commercebank.mapper.ManagerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ManagerDAO {
    // The JdbcTemplate is the class that interfaces with the database
    private final JdbcTemplate jdbcTemplate;
    private final ManagerMapper managerMapper;

    @Autowired // This tells Spring to use the JdbcTemplate Bean we created in the configuration class
    ManagerDAO(final JdbcTemplate jdbcTemplate, final ManagerMapper managerMapper){
        // Set up the dependencies from Spring
        this.jdbcTemplate = jdbcTemplate;
        this.managerMapper = managerMapper;
    }

    public List<Manager> list(){
        // Run the SQL query on the database to select all managers and return a List of Manager objects
        return this.jdbcTemplate.query("SELECT * FROM manager", managerMapper);
    }

    public void insert(Manager manager){
        // Run the SQL query on the database to add a new manager
        this.jdbcTemplate.update("INSERT INTO manager (f_name, l_name, phone_num, email, branch_id) VALUES (?, ?, ?, ?, ?)",
                manager.getFirstName(),
                manager.getLastName(),
                manager.getPhoneNumber(),
                manager.getEmail(),
                manager.getBranchId());
    }

    public void update(Manager manager){
        // Run the SQL query on the database to make changes to a manager
        String sql = "UPDATE manager SET f_name=?, l_name=?, phone_num=?, email = ?, branch_id=? WHERE id = ?";
        this.jdbcTemplate.update(sql, manager.getFirstName(), manager.getLastName(),
                manager.getPhoneNumber(), manager.getEmail(), manager.getBranchId(), manager.getId());
    }

    public void delete(int id){
        // Run the SQL query on the database to delete a manager
        this.jdbcTemplate.update("DELETE FROM manager WHERE id = ?", id); }

}
