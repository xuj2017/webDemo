#include <node.h>
#include <v8.h>

using namespace v8;

Handle<Value> SayHello(const Arguments& args){
    HandleScope scope;
    return scope.Close(String::New('Hello world!'));
}