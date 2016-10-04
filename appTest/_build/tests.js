QUnit.module("core");

test("track", function (assert) {
    var done = assert.async();

    playtemEmbedded.Core.track("unittest", "testTracker", function() {
        assert.ok(1);
        done();
    });
});

QUnit.module("spotx inject script");

test("fail: url 404", function (assert) {
    var done = assert.async();
    assert.expect(2);

    //Arrange
    var provider = new playtemEmbedded.Spotx({
        scriptUrl : "http://playtem1234/script.js"
    });

    provider.execute(function (error, result) {
        assert.ok(error != null, "error is not null: " + error);
        assert.equal(result, null, "there is no result");
        done();
    });
});

// test("fail: timeout", function (assert) {
//     var done = assert.async();
//     assert.expect(2);

//     //Arrange
//     var provider = new playtemEmbedded.Spotx();
//     provider.timeouts.scriptInjected.duration = 10;

//     provider.execute(function (error, result) {
//         assert.ok(error != null, "error is not null: " + error);
//         assert.equal(result, null, "there is no result");
//         done();
//     });
// });

// test("fail: bad channel id", function (assert) {
//     var done = assert.async();
//     assert.expect(2);

//     //Arrange
//     var provider = new playtemEmbedded.Spotx();
//     provider.settings.scriptOptions["spotx_channel_id"] = "0000";

//     provider.execute(function (error, result) {
//         assert.ok(error != null, "error is not null: " + error);
//         assert.equal(result, null, "there is no result");
//         done();
//     });
// });

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