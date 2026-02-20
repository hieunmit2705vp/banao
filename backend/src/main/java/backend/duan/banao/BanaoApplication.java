package backend.duan.banao;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class BanaoApplication {

	public static void main(String[] args) {
		SpringApplication.run(BanaoApplication.class, args);
	}

}
