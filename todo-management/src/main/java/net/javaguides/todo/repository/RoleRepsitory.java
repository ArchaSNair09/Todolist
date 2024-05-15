package net.javaguides.todo.repository;

import net.javaguides.todo.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepsitory extends JpaRepository<Role, Long>
{
}
