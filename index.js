var snmp = require('snmpjs');

var agent = snmp.createAgent();

agent.request({ oid: '.1.3.6.1.2.1.1.1', handler: function(prq){
  var rand = Math.floor((Math.random() * 10) + 1);
  if (rand % 2 === 0) {
    var val = snmp.data.createData({type:'OctetString', value:new Date().toISOString()});
    snmp.provider.readOnlyScalar(prq, val);
  } else {
    prq.done(snmp.pdu.genErr);
  }
}});

agent.bind({family:'udp4', port:1161});
