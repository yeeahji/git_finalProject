package spring.conf;


import org.apache.commons.dbcp2.BasicDataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

@Configuration
@PropertySource("classpath:spring/db.properties")
public class SpringConfiguration {
	@Autowired
	private ApplicationContext applicationContext;
	@Autowired
	Environment environment;
	
	//DataSource
	@Bean
	public BasicDataSource dataSource(){ BasicDataSource basicDataSource =
	new BasicDataSource();
	basicDataSource.setDriverClassName(environment.getProperty("jdbc.driver"));
	basicDataSource.setUrl(environment.getProperty("jdbc.url"));
	basicDataSource.setUsername(environment.getProperty("jdbc.username"));
	basicDataSource.setPassword(environment.getProperty("jdbc.password"));
	basicDataSource.setMaxTotal(20); basicDataSource.setMaxIdle(3);
	 
	return basicDataSource; }
	
	//SqlSessionFactoryBean
	@Bean
	public SqlSessionFactory sqlSessionFactory() throws Exception {
		SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
		sqlSessionFactoryBean.setConfigLocation(new ClassPathResource("spring/mybatis-config.xml"));
		sqlSessionFactoryBean.setDataSource(dataSource());
		sqlSessionFactoryBean.setMapperLocations(applicationContext.getResources("classpath:*/dao/*Mapper.xml"));        
		return sqlSessionFactoryBean.getObject();
	}
	
	//SqlSession
	@Bean
	public SqlSessionTemplate sqlSession() throws Exception {
		return new SqlSessionTemplate(sqlSessionFactory());
	}
	
	//Transaction
	@Bean
	public DataSourceTransactionManager transactionManager() {
		return new DataSourceTransactionManager(dataSource());
	}
}
