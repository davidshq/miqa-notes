# Celery
- https://docs.celeryproject.org/en/stable/getting-started/introduction.html
- "Task queues are used as a mechanism to distribute work across threads or machine."
- "A task queue's input is a unit of work called a task."
- "Dedicated worker processes constantly monitor task queues for new work to perform."
- "Celery communicates via messages, usually using a broker to mediate between clients and workers."
- "To initiate a task the client adds a message to the queue, the broker then delivers that message to a worker."
- "A Celery system can consist of multiple workers and brokers, giving way to high availability and horizontal scaling."
- "Language interoperability can also be achieved exposing an HTTP endpoint and having a task that requests it (webhooks)."
- "Celery requires a message transport to send and receive messages. The RabbitMQ and Redis broker transports are feature complete..."
- https://docs.celeryproject.org/en/stable/getting-started/first-steps-with-celery.html
- https://docs.celeryproject.org/en/stable/getting-started/next-steps.html

# RabbitMQ
- "message broker"

# minio
https://github.com/minio/minio
- "High Performance Object Storage...API compatible with Amazon S3...for machine learning, analytics and application data workloads."


# Definitions
- Message broker - Wikipedia: "A message broker (also known as an integration broker or interface engine[1]) is an intermediary computer program module that translates a message from the formal messaging protocol of the sender to the formal messaging protocol of the receiver."
    - "Message brokers are a building block of message-oriented middleware (MOM) but are typically not a replacement for traditional middleware like MOM and remote procedure call (RPC).[2][3]" - DM: What does this mean?
    - "A message broker is an architectural pattern for message validation, transformation, and routing. It mediates communication among applications, minimizing the mutual awareness that applications should have of each other in order to be able to exchange messages, effectively implementing decoupling.[4]"