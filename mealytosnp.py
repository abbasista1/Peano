import sys

sys.stdout = open('peanosnp.txt', 'w')

n_transitions = int(input())
n = int(input()) # number of states
t = int(input()) # number of outputs

for x in range(n_transitions):
    i, k, s, j = map(int, input().split())
    print("a_{} / a_{} -> a_{}".format(k*(n+1)+i+t, k*(n+1)+i+t-j, n+s))

sys.stdout.close()