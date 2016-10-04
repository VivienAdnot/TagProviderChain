QUnit.module("core");

test("track", function (assert) {
    var done = assert.async();

    playtemEmbedded.Core.track("unittest", "testTracker", function() {
        assert.ok(1);
        done();
    });
});