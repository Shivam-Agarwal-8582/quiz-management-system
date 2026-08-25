-- ============================================================
-- QuizMaster seed data: 5 subjects x 12 questions = 60 total
-- INSERT IGNORE keeps seeding idempotent (no duplicates on restart)
-- ============================================================

-- ------------------------- APTITUDE -------------------------
INSERT IGNORE INTO question (text, option_a, option_b, option_c, option_d, correct_answer, category) VALUES
('Find the next number in the series: 2, 6, 12, 20, 30, ?', '40', '42', '44', '46', '42', 'Aptitude'),
('What is 15% of 200?', '25', '30', '35', '40', '30', 'Aptitude'),
('A train covers 240 km in 4 hours. What is its average speed?', '50 km/h', '55 km/h', '60 km/h', '65 km/h', '60 km/h', 'Aptitude'),
('Find the odd one out: 2, 3, 5, 7, 9, 11', '3', '5', '9', '11', '9', 'Aptitude'),
('What is the simple interest on Rs. 5000 at 8% per annum for 2 years?', 'Rs. 600', 'Rs. 700', 'Rs. 800', 'Rs. 900', 'Rs. 800', 'Aptitude'),
('Rs. 1200 is divided among A, B and C in the ratio 2:3:5. What is B''s share?', 'Rs. 240', 'Rs. 360', 'Rs. 480', 'Rs. 600', 'Rs. 360', 'Aptitude'),
('What is the average of the first 10 natural numbers?', '5.0', '5.5', '6.0', '6.5', '5.5', 'Aptitude'),
('What is the angle between the hands of a clock at 3:00?', '60 degrees', '75 degrees', '90 degrees', '120 degrees', '90 degrees', 'Aptitude'),
('A can finish a work in 10 days and B in 15 days. Working together, how many days will they take?', '5 days', '6 days', '7 days', '8 days', '6 days', 'Aptitude'),
('What is the probability of getting a head in a single coin toss?', '0', '1/2', '1/3', '1', '1/2', 'Aptitude'),
('Find the next letter in the series: A, C, F, J, ?', 'M', 'N', 'O', 'P', 'O', 'Aptitude'),
('What is the compound interest on Rs. 1000 at 10% per annum for 2 years (compounded annually)?', 'Rs. 200', 'Rs. 210', 'Rs. 220', 'Rs. 231', 'Rs. 210', 'Aptitude');

-- --------------------------- DBMS ---------------------------
INSERT IGNORE INTO question (text, option_a, option_b, option_c, option_d, correct_answer, category) VALUES
('What does DBMS stand for?', 'Data Backup Management System', 'Database Management System', 'Digital Business Management System', 'Database Maintenance System', 'Database Management System', 'DBMS'),
('Which SQL command is used to retrieve data from a table?', 'INSERT', 'UPDATE', 'SELECT', 'DELETE', 'SELECT', 'DBMS'),
('Which property must a primary key satisfy?', 'It can be NULL', 'It uniquely identifies each row', 'It can repeat', 'It must be numeric only', 'It uniquely identifies each row', 'DBMS'),
('Which of the following is NOT a NoSQL database?', 'MongoDB', 'Cassandra', 'Redis', 'MySQL', 'MySQL', 'DBMS'),
('What does ACID stand for in transaction management?', 'Atomicity, Consistency, Isolation, Durability', 'Accuracy, Consistency, Integrity, Durability', 'Atomicity, Concurrency, Isolation, Dependency', 'Access, Control, Index, Data', 'Atomicity, Consistency, Isolation, Durability', 'DBMS'),
('Normalization in a database is primarily used to reduce what?', 'Storage speed', 'Data redundancy', 'Number of tables', 'Query length', 'Data redundancy', 'DBMS'),
('Which SQL command removes a table along with its structure?', 'DELETE', 'TRUNCATE', 'DROP', 'REMOVE', 'DROP', 'DBMS'),
('Which join returns all rows from the left table and matching rows from the right table?', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'LEFT JOIN', 'DBMS'),
('A candidate key made up of two or more attributes is called a:', 'Super key', 'Composite key', 'Foreign key', 'Alternate key', 'Composite key', 'DBMS'),
('What is the default port number of MySQL server?', '1433', '1521', '27017', '3306', '3306', 'DBMS'),
('A relation is in BCNF if every determinant is a:', 'Primary key', 'Candidate key', 'Foreign key', 'Unique key', 'Candidate key', 'DBMS'),
('An index in a database is mainly used to improve which operation?', 'Insertion', 'Updation', 'Deletion', 'Data retrieval', 'Data retrieval', 'DBMS');

-- ---------------------------- OS ----------------------------
INSERT IGNORE INTO question (text, option_a, option_b, option_c, option_d, correct_answer, category) VALUES
('Which of the following is NOT an operating system?', 'Windows', 'Linux', 'Oracle', 'macOS', 'Oracle', 'OS'),
('A process that is waiting for I/O to complete is said to be in which state?', 'Running', 'Ready', 'Waiting (Blocked)', 'Terminated', 'Waiting (Blocked)', 'OS'),
('Round Robin scheduling algorithm uses which concept?', 'Priority levels', 'Fixed time quantum', 'First come first serve only', 'Shortest job first', 'Fixed time quantum', 'OS'),
('Which of these is a necessary condition for deadlock?', 'Mutual exclusion', 'Hold and wait', 'Circular wait', 'All of the above', 'All of the above', 'OS'),
('A page fault occurs when:', 'A page is corrupted', 'A page is not present in main memory', 'The disk is full', 'Two pages have the same address', 'A page is not present in main memory', 'OS'),
('Excessive paging activity that slows down a system is called:', 'Fragmentation', 'Thrashing', 'Spooling', 'Buffering', 'Thrashing', 'OS'),
('Which primitive is used for process synchronization?', 'Semaphore', 'Compiler', 'Loader', 'Assembler', 'Semaphore', 'OS'),
('Which type of memory is volatile?', 'ROM', 'RAM', 'Hard disk', 'Flash drive', 'RAM', 'OS'),
('Free memory space scattered in small non-contiguous blocks is called:', 'Internal fragmentation', 'External fragmentation', 'Compaction', 'Swapping', 'External fragmentation', 'OS'),
('The core component of an operating system that manages resources is the:', 'Shell', 'Kernel', 'File system', 'Device driver', 'Kernel', 'OS'),
('The fork() system call is used to:', 'Delete a process', 'Create a new process', 'Kill a process', 'Pause a process', 'Create a new process', 'OS'),
('Virtual memory in an OS is typically implemented using:', 'Segmentation only', 'Demand paging', 'Spooling', 'DMA', 'Demand paging', 'OS');

-- ------------------------ COMPUTER NETWORKS (CN) ------------------------
INSERT IGNORE INTO question (text, option_a, option_b, option_c, option_d, correct_answer, category) VALUES
('What is the default port number for HTTP?', '21', '80', '443', '8080', '80', 'CN'),
('How many layers are there in the OSI model?', '4', '5', '7', '9', '7', 'CN'),
('Which protocol guarantees reliable, connection-oriented delivery?', 'UDP', 'TCP', 'ICMP', 'ARP', 'TCP', 'CN'),
('An IPv6 address is how many bits long?', '32 bits', '64 bits', '128 bits', '256 bits', '128 bits', 'CN'),
('DNS is used to resolve:', 'MAC address from IP', 'Domain name to IP address', 'IP address to domain name only', 'Port numbers', 'Domain name to IP address', 'CN'),
('Which device connects two different networks and routes packets between them?', 'Hub', 'Switch', 'Router', 'Repeater', 'Router', 'CN'),
('SMTP protocol is used for:', 'Receiving emails', 'Sending emails', 'Browsing websites', 'File transfer', 'Sending emails', 'CN'),
('What is the PDU (Protocol Data Unit) at the data link layer called?', 'Segment', 'Packet', 'Frame', 'Bit', 'Frame', 'CN'),
('What is the default port number for FTP control connection?', '20', '21', '22', '25', '21', 'CN'),
('A MAC address is how many bits long?', '32 bits', '48 bits', '64 bits', '128 bits', '48 bits', 'CN'),
('The ping utility uses which protocol to test connectivity?', 'TCP', 'UDP', 'ICMP', 'HTTP', 'ICMP', 'CN'),
('HTTPS runs on which default port number?', '80', '443', '3389', '110', '443', 'CN');

-- --------------------------- OOPS ---------------------------
INSERT IGNORE INTO question (text, option_a, option_b, option_c, option_d, correct_answer, category) VALUES
('What does OOP stand for?', 'Object Oriented Programming', 'Operation Oriented Program', 'Output Oriented Process', 'Object Ordered Programming', 'Object Oriented Programming', 'OOPS'),
('Wrapping data and methods into a single unit is called:', 'Inheritance', 'Encapsulation', 'Polymorphism', 'Abstraction', 'Encapsulation', 'OOPS'),
('Which OOP feature allows a class to reuse code from another class?', 'Polymorphism', 'Abstraction', 'Inheritance', 'Encapsulation', 'Inheritance', 'OOPS'),
('Two methods with the same name but different parameters in one class is an example of:', 'Method overriding', 'Method overloading', 'Dynamic binding', 'Data hiding', 'Method overloading', 'OOPS'),
('Which of the following languages does NOT support full OOP concepts?', 'Java', 'C++', 'Python', 'C', 'C', 'OOPS'),
('An abstract class cannot be:', 'Extended', 'Instantiated directly', 'Declared public', 'Given constructors', 'Instantiated directly', 'OOPS'),
('Runtime polymorphism in Java is achieved through:', 'Method overloading', 'Method overriding', 'Constructor overloading', 'Static binding', 'Method overriding', 'OOPS'),
('What is the primary purpose of a constructor?', 'Destroy objects', 'Initialize objects when created', 'Copy files', 'Overload operators', 'Initialize objects when created', 'OOPS'),
('The ''this'' keyword in Java refers to:', 'Parent class object', 'Current class object', 'Global variable', 'Static method', 'Current class object', 'OOPS'),
('Hiding internal implementation details and showing only functionality is called:', 'Encapsulation', 'Abstraction', 'Inheritance', 'Composition', 'Abstraction', 'OOPS'),
('Binding of method calls at compile time is known as:', 'Dynamic binding', 'Late binding', 'Static binding', 'Message passing', 'Static binding', 'OOPS'),
('Which of the following can an interface contain by default?', 'Instance variables', 'Abstract methods and constants', 'Constructors', 'Synchronized blocks', 'Abstract methods and constants', 'OOPS');
