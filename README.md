# Subdocument Array Mutation

Typescript routine to perform operations over subdocuments


### Requirements
    - node @ 12.16.x
    - npm install (install dependencies)
    
### Try Test cases (Recommended)
 ```npm test```
 
 ### Run Test cases with daemon
  ```npm watch:test```
  
### Generate documentation files from spec
 ```npm run doc```
 
 ### Run eslint
  ```npm run lint```
   
 ### Fix linter errors
  ```npm run fix```
  
 ### Build JS files
 ```npm run build```
  
 ### Run index file locally
  ```npm start```
    
### What to improve:
- Some sort of persistence over the performed operations
- More case scenarios to test (failure paths)
- Expose the different operation through an API rest server
- Make every operation work with any kind of nested mutation structure
- Set up a docker container and CI/CD pipelines
- This code resulted quite messy, it can be refactored to be easy to read
