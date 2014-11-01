// Force tests to run in the "test" environment.
process.env.NODE_ENV = 'test';

// Make sure the global "app" is available to tests.
app = this.app || require('../app');
