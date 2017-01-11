/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.trimap.alarmapp.service;

import com.google.common.base.Splitter;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import com.trimap.util.function.Consumer;
import java.util.List;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.task.TaskExecutor;
/**
 *
 * @author Peng
 */
@Component("sampleService")
@Transactional
public class SampleServiceImpl implements SampleService {
    
    private final Log logger = LogFactory.getLog(getClass());
    
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private Environment env;
    
    @Autowired
    private TaskExecutor taskExecutor;    
    
    @Override
    public String processAll(JSONArray jArray) {
        StringBuilder s = new StringBuilder();
        JSONObject object = null;
        for (int i = 0; i < jArray.length(); i++) {
            logger.info(String.format("This is the No.%d email", i));
            s.setLength(0);
            object = jArray.getJSONObject(i);
            s.append("<table style='width:247px; border-collapse: collapse;'>");
            s.append(String.format("<tr><td style='width:55%%;border: 1px solid #ccc'>%s</td><td style='width:45%%;border: 1px solid #ccc'>%s</td></tr>", "Traffic Date", object.get("Date")));
            s.append(String.format("<tr><td style='border: 1px solid #ccc'>%s</td><td style='border: 1px solid #ccc'>%s</td></tr>", "Traffic Count", object.get("Actual")));
            s.append(String.format("<tr><td style='border: 1px solid #ccc'>%s</td><td style='border: 1px solid #ccc'>%s</td></tr>", "Forecast", object.get("Forecast")));
            s.append(String.format("<tr><td style='border: 1px solid #ccc'>%s</td><td style='border: 1px solid #ccc'>%s</td></tr>", "Deviation", object.get("Difference")));
            s.append(String.format("<tr><td style='border: 1px solid #ccc'>%s</td><td style='border: 1px solid #ccc'>%.2f%%</td></tr>", "Deviation %", Double.parseDouble(object.get("percentage").toString())*100));
            s.append(String.format("<tr><td style='border: 1px solid #ccc'>%s</td><td style='border: 1px solid #ccc'>%s</td></tr>", "Business", object.get("Business")));
            s.append(String.format("<tr><td style='border: 1px solid #ccc'>%s</td><td style='border: 1px solid #ccc'>%s</td></tr>", "Holiday", object.get("Holiday")));
            s.append("</table>");
            sendEmail(s.toString(), String.format("%s Daily Traffic Count Exceeded 15%% Deviation (%.0f%%)" , object.get("Date"), Double.parseDouble(object.get("Pct Diff").toString())*100));
        }
        return env.getProperty("email.recipient");
    }    
    
    protected void sendEmail(final String body, final String subject) {
        taskExecutor.execute( new Runnable() {
            public void run() {
                final MimeMessagePreparator preparator = new MimeMessagePreparator() {
                    @Override
                    public void prepare(MimeMessage msg) throws Exception {
                        final MimeMessageHelper helper = new MimeMessageHelper(msg, true);

                        processEmailDispatcher(body).accept(helper);

                        helper.setSubject(subject);
                        helper.setText(body, true);
                    }
                };
                mailSender.send(preparator);
            }
        });
    }
    
   
    private interface EmailDispatcher extends Consumer<MimeMessageHelper> {
    }
    
    private EmailDispatcher processEmailDispatcher(String data) {
        return testDispatcher;
    }
    
    private final EmailDispatcher testDispatcher = new EmailDispatcher() {
        @Override
        public void accept(MimeMessageHelper helper) {
            try {
                List<String> recipents = Splitter.on(";").trimResults().omitEmptyStrings().splitToList(env.getProperty("email.recipient"));
                logger.info(recipents);
                helper.setTo(recipents.toArray(new String[recipents.size()]));
                helper.setFrom("jonas-test@trimap.com");
            } catch (MessagingException ex) {
                throw new RuntimeException(ex);
            }
        }
    };    
}
