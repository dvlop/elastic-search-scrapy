FROM sebp/elk:es233_l232_k451

RUN apt-get update && apt-get -y install wget && apt-get -y install postgresql-client
RUN wget https://jdbc.postgresql.org/download/postgresql-9.4.1208.jre7.jar -P /etc/

WORKDIR ${LOGSTASH_HOME}
RUN gosu logstash bin/plugin install logstash-input-jdbc

WORKDIR ${KIBANA_HOME}
RUN gosu kibana bin/kibana plugin -i elastic/sense

# add new config
ADD query-out.conf /etc/logstash/conf.d/query-out.conf
ADD query.sql /etc/logstash/query.sql
