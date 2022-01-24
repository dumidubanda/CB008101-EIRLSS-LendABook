package com.cb008101.eirlss.lms.mvc.plans;

import com.cb008101.eirlss.lms.mvc.plans.Plans;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlansRepository extends JpaRepository<Plans, Long> {
}
