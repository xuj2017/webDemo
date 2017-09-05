suite('Global Test',function(){
    test('page has a valid title',function(){
        assert(document.title && document.title.match(/\S/)&&document.title.toUpperCase() !== 'TODO');
    })
})