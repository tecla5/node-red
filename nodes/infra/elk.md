# Elk node

Wrapper for [elk-docker](https://elk-docker.readthedocs.io/) image

```
elk:
  image: sebp/elk
  ports:
    - "5601:5601"
    - "9200:9200"
    - "5044:5044"
```

This node should just have a port atrribute for each:

```
5601 (Kibana web interface).
9200 (Elasticsearch JSON interface).
5044 (Logstash Beats interface
```

### Run

`sudo docker-compose up elk`