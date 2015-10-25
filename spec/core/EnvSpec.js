// TODO: Fix these unit tests!
describe("Env", function() {
  var env;
  beforeEach(function() {
    env = new j$.Env();
  });

  describe("#pending", function() {
    it("throws the Pending Spec exception", function() {
      expect(function() {
        env.pending();
      }).toThrow(j$.Spec.pendingSpecExceptionMessage);
    });

    it("throws the Pending Spec exception with a custom message", function() {
      expect(function() {
        env.pending('custom message');
      }).toThrow(j$.Spec.pendingSpecExceptionMessage + 'custom message');
    });
  });

  describe("#topSuite", function() {
    it("returns the Jasmine top suite for users to traverse the spec tree", function() {
      var suite = env.topSuite();
      expect(suite.description).toEqual('Jasmine__TopLevel__Suite');
    });
  });

  describe('#describe', function () {
    var spec = function(done){};
    it("throws the error", function() {
      expect(function() {
        env.describe('done method', spec);
      }).toThrow(new Error('describe is not expecting a done parameter'));
    });
  });

  it('can configure specs to throw errors on expectation failures', function() {
    env.throwOnExpectationFailure(true);

    spyOn(j$, 'Spec');
    env.it('foo', function() {});
    expect(j$.Spec).toHaveBeenCalledWith(jasmine.objectContaining({
      throwOnExpectationFailure: true
    }));
  });

  it('can configure suites to throw errors on expectation failures', function() {
    env.throwOnExpectationFailure(true);

    spyOn(j$, 'Suite');
    env.describe('foo', function() {});
    expect(j$.Suite).toHaveBeenCalledWith(jasmine.objectContaining({
      throwOnExpectationFailure: true
    }));
  });

  describe('#xit', function() {
    it('calls spec.pend with "Temporarily disabled with xit"', function() {
      var pendSpy = jasmine.createSpy();
      spyOn(env, 'it').and.returnValue({
        pend: pendSpy
      });
      env.xit();
      expect(pendSpy).toHaveBeenCalledWith('Temporarily disabled with xit');
    });
  });
});
