package com.trimap.alarmapp;

import com.trimap.alarmapp.service.SampleService;
import static org.assertj.core.api.Java6Assertions.assertThat;
import org.json.JSONArray;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AlarmApplicationTests {
        @Autowired
        private SampleService service;
	@Test
	public void contextLoads() {
	}
        @Test
        public void testService() {
            assertThat(service).isNotNull();
        }
	@Test
	public void testEmail() { 
            JSONArray array = new JSONArray("[{Date:'2015-12-13',Business:'NO',Holiday:'NO',Forecast:18905,Actual:26146,Difference:7241,Pct Diff:0.38, percentage:0.3812}]");
            service.processAll(array);
	}        

}
