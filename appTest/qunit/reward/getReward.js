QUnit.module("reward");

test("reward", function (assert) {
    var done = assert.async();
    assert.expect(2);

    var rewarder = new playtemEmbedded.Reward({
        apiKey: "b9de-4f25v"
    });

    rewarder.execute(function(error, success) {
        assert.equal(error, null);
        assert.equal(success, "success");
        done();
    });
});